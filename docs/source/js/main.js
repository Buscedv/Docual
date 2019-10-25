'use strict';

let app = new Vue({
	el: '#app',
	data: {
		isSidenavOpen: false,
		isSearchOpen: false,
		firstClick: false,
		sectionLinks: [],
		githubLink: '',
		readmeLink: '',
		sidenavWidthPerc: '20%',
		results: [],
		search: '',
	},
	created: function() {
		this.getSetData();
		
		window.addEventListener('resize', this.sidebarController);
		if (this.getWidth() > 850) {
			this.openNav();
		} else {
			this.firstClick = true;
		}
		this.fetchData();

		if (this.getWidth() <= 850) {
			this.closeAll();
			this.sidenavWidthPerc = '50%';
			if (this.getWidth() <= 500) {
				this.sidenavWidthPerc = '70%';
			}
		}
		else {
			this.sidenavWidthPerc = '20%';
			if (!this.isSidenavOpen && !this.isSearchOpen) {
				this.openNav();
			}
		}
	},
	destroyed() {
		window.removeEventListener('resize', this.sidebarController);
	},
	methods: {
		sidebarController: function(e) {
			if (this.getWidth() <= 850) {
				this.closeAll();
				this.sidenavWidthPerc = '50%';
				if (this.getWidth() <= 500) {
					this.closeAll();
					this.sidenavWidthPerc = '60%';
				}
			}
			else {
				this.sidenavWidthPerc = '20%';
				if (!this.isSidenavOpen && !this.isSearchOpen) {
					this.openNav();
				}
			}
		},
		openNav: function() {
			if (this.isSidenavOpen || this.isSearchOpen && !this.firstClick) {
				this.closeAll();
			} else {
				this.firstClick = false;
				document.getElementById('search_nav').style.width = '0';
				document.getElementById('sidenav').style.width = this.sidenavWidthPerc;
				document.getElementById('sidenav').style.paddingRight = '60px';
				document.getElementById('sidenav').style.visibility = 'visible';
				document.getElementById('search_nav').style.paddingRight = '0';
				if (this.getWidth() < 850) {
					document.getElementsByClassName('sidebar-overlay')[0].style.left = '0';
				}
				this.isSidenavOpen = true;
				this.isSearchOpen = false;
			}
		},
		openSearch: function() {
			if (this.isSearchOpen) {
				this.closeAll();
			} else {
				document.getElementById('sidenav').style.width = '0';
				document.getElementById('sidenav').style.paddingRight = '0';
				this.isSidenavOpen = false;
				document.getElementById('search_nav').style.width = this.sidenavWidthPerc;
				document.getElementById('search_nav').style.paddingRight = '60px';
				document.getElementById('search_nav').style.visibility = 'visible';

				if (this.getWidth() < 850) {
					document.getElementsByClassName('sidebar-overlay')[0].style.left = '0';
				}

				this.isSearchOpen = true;
			}
		},
		closeAll: function() {
			document.getElementById('search_nav').style.width = '0';
			document.getElementById('sidenav').style.width = '0';
			document.getElementsByClassName('sidebar-overlay')[0].style.left = '-100%';
			document.getElementById('search_nav').style.paddingRight = '0';
			document.getElementById('sidenav').style.paddingRight = '0';
			document.getElementById('search_nav').style.visibility = 'hidden';
			document.getElementById('sidenav').style.visibility = 'hidden';
			this.isSidenavOpen = false;
			this.isSearchOpen = false;
		},
		closeSearch: function() {
			this.isSearchOpen = false;
			document.getElementById('search_nav').style.width = '0';
			document.getElementById('sidenav').style.width = this.sidenavWidthPerc;
			document.getElementById('sidenav').style.paddingRight = '60px';
			document.getElementById('sidenav').style.visibility = 'visible';
			document.getElementById('search_nav').style.paddingRight = '0';
			document.getElementById('search_nav').style.visibility = 'hidden';
			this.isSidenavOpen = true;
		},
		getWidth: function()  {
			return Math.max(
				document.body.scrollWidth,
				document.documentElement.scrollWidth,
				document.body.offsetWidth,
				document.documentElement.offsetWidth,
				document.documentElement.clientWidth
			);
		},
		fetchData: function () {
			let Httpreq = new XMLHttpRequest(); // a new request
			Httpreq.open('GET',this.readmeLink,false);
			Httpreq.send(null);
			let source = Httpreq.responseText;

			if (this.readmeLink === '') {
				source = '<h1>Setup Required</h1><p>This page has not been properly set up.</p>';
			}

			let converter = new showdown.Converter({tables: 'true', tasklists: 'true', strikethrough: 'true'}),
					html  = converter.makeHtml(source);
			document.getElementById('content').innerHTML = html;

			let ancestor = document.getElementById('content'),
					descendents = ancestor.getElementsByTagName('*');

			let i;
			let sections = [];

			for (i = 0; i < descendents.length; i++) {
				if ($(descendents[i]).is('h1')) {
					sections.push({title: descendents[i].textContent, link: '#' + descendents[i].id, subs: [], contents: []});
				} else if ($(descendents[i]).is('h2')) {
					sections[sections.length-1].subs.push({title: descendents[i].textContent, link: '#' + descendents[i].id});
				} else if ($(descendents[i]).is('p') && descendents[i].textContent.substring(0, 4) === '/i/ ') {
					let annotation = document.createElement('div');
					annotation.setAttribute('class', 'callout');

					let em = document.createElement('em');
					em.setAttribute('class', 'fas fa-info');

					let content = document.createElement('p');
					content.textContent = descendents[i].textContent.substring(4);

					annotation.appendChild(em);
					annotation.appendChild(content);

					let node = ancestor.childNodes[i + 1];
					let parentDiv = node.parentNode;
					parentDiv.insertBefore(annotation, node);
					node.parentNode.removeChild(ancestor.childNodes[i + 2]);

					sections[sections.length-1].contents.push(descendents[i].innerHTML);

				} else {
					sections[sections.length-1].contents.push(descendents[i].innerHTML);
				}
			}
			this.sectionLinks = sections;
		},
		getSetData: function () {
			let Httpreq = new XMLHttpRequest(); // a new request
			Httpreq.open('GET','config.json',false);
			Httpreq.send(null);
			let tmpData = Httpreq.responseText;

			tmpData = JSON.parse(tmpData);

			this.readmeLink = tmpData.markdown_file_url;
			this.githubLink = tmpData.github_project_link;
			document.title = tmpData.title;
		},
	},
	computed: {
		filteredResults: function() {
			let i;
			let results = [];
			for (i = 0; i < this.sectionLinks.length; i++) {
				let data = '';
				let x;
				for (x = 0; x < this.sectionLinks[i].contents.length; x++) {
					data = data + this.sectionLinks[i].contents[x];
				}
				if (String(data).toLowerCase().includes(this.search.toLowerCase()) && this.search !== '') {
					results.push({section: this.sectionLinks[i], data: data});
				}
			}
			return results;
		}
	}
});