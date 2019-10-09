let app = new Vue({
	el: "#app",
	data: {
		is_sidenav_open: false,
		is_search_open: false,
		first_click: false,
		section_links: [],
		github_link: '',
		readme_link: '',
		sidenav_width_perc: '20%',
		results: [],
		search: '',
	},
	created: function() {
		this.get_set_data();
		
		window.addEventListener("resize", this.sidebarController);
		if (this.getWidth() > 850) {
			this.openNav();
		} else {
			this.first_click= true;
		}
		this.fetch_data();

		if (this.getWidth() <= 850) {
			this.closeAll();
			this.sidenav_width_perc = '50%';
			if (this.getWidth() <= 500) {
				this.sidenav_width_perc = '70%';
			}
		}
		else {
			this.sidenav_width_perc = '20%';
			if (!this.is_sidenav_open && !this.is_search_open) {
				this.openNav();
			}
		}
	},
	destroyed() {
		window.removeEventListener("resize", this.sidebarController);
	},
	methods: {
		sidebarController: function(e) {
			if (this.getWidth() <= 850) {
				this.closeAll();
				this.sidenav_width_perc = '50%';
				if (this.getWidth() <= 500) {
					this.closeAll();
					this.sidenav_width_perc = '60%';
				}
			}
			else {
				this.sidenav_width_perc = '20%';
				if (!this.is_sidenav_open && !this.is_search_open) {
					this.openNav();
				}
			}
		},
		openNav: function() {
			if (this.is_sidenav_open || this.is_search_open && !this.first_click) {
				this.closeAll();
			} else {
				this.first_click = false;
				document.getElementById("search_nav").style.width = "0";
				document.getElementById("sidenav").style.width = this.sidenav_width_perc;
				document.getElementById("sidenav").style.paddingRight = "60px";
				document.getElementById("sidenav").style.visibility = "visible";
				document.getElementById("search_nav").style.paddingRight = "0";
				if (this.getWidth() < 850) {
					document.getElementsByClassName("sidebar-overlay")[0].style.left = "0";
				}
				this.is_sidenav_open = true;
				this.is_search_open = false;
			}
		},
		openSearch: function() {
			if (this.is_search_open) {
				this.closeAll();
			} else {
				document.getElementById("sidenav").style.width = "0";
				document.getElementById("search_nav").style.width = this.sidenav_width_perc;
				document.getElementById("search_nav").style.paddingRight = "60px";
				document.getElementById("search_nav").style.visibility = "visible";
				document.getElementById("sidenav").style.paddingRight = "0";
				if (this.getWidth() < 850) {
					document.getElementsByClassName("sidebar-overlay")[0].style.left = "0";
				}
				this.is_search_open = true;
				this.is_sidenav_open = false;
			}
		},
		closeAll: function() {
			document.getElementById("search_nav").style.width = "0";
			document.getElementById("sidenav").style.width = "0";
			document.getElementsByClassName("sidebar-overlay")[0].style.left = "-100%";
			document.getElementById("search_nav").style.paddingRight = "0";
			document.getElementById("sidenav").style.paddingRight = "0";
			document.getElementById("search_nav").style.visibility = "hidden";
			document.getElementById("sidenav").style.visibility = "hidden";
			this.is_sidenav_open = false;
			this.is_search_open = false;
		},
		closeSearch: function() {
			this.is_search_open = false;
			document.getElementById("search_nav").style.width = "0";
			document.getElementById("sidenav").style.width = this.sidenav_width_perc;
			document.getElementById("sidenav").style.paddingRight = "60px";
			document.getElementById("sidenav").style.visibility = "visible";
			document.getElementById("search_nav").style.paddingRight = "0";
			document.getElementById("search_nav").style.visibility = "hidden";
			this.is_sidenav_open = true;
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
		fetch_data: function () {
			let Httpreq = new XMLHttpRequest(); // a new request
			Httpreq.open("GET",this.readme_link,false);
			Httpreq.send(null);
			let source = Httpreq.responseText;

			let converter = new showdown.Converter({tables: 'true', tasklists: 'true', strikethrough: 'true'}),
					html      = converter.makeHtml(source);
			document.getElementById('content').innerHTML = html;

			let ancestor = document.getElementById('content'),
					descendents = ancestor.getElementsByTagName('*');

			let i;
			let sections = [];

			for (i = 0; i < descendents.length; i++) {
				if ($(descendents[i]).is('h1')) {
					sections.push({title: descendents[i].textContent, link: "#"+descendents[i].id, subs: [], contents: []});
				} else if ($(descendents[i]).is('h2')) {
					sections[sections.length-1].subs.push({title: descendents[i].textContent, link: "#"+descendents[i].id});
				} else if ($(descendents[i]).is('p') && descendents[i].textContent.substring(0, 4) === '/i/ ') {
					let annotation = document.createElement('div');
					annotation.setAttribute("class", "callout");

					let em = document.createElement('em');
					em.setAttribute("class", "fas fa-info");

					let content = document.createElement('p');
					content.textContent = descendents[i].textContent.substring(4);

					annotation.appendChild(em);
					annotation.appendChild(content);

					let node = ancestor.childNodes[i+1];
					let parentDiv = node.parentNode;
					parentDiv.insertBefore(annotation, node);
					node.parentNode.removeChild(ancestor.childNodes[i+2]);

					sections[sections.length-1].contents.push(descendents[i].innerHTML)

				} else {
					sections[sections.length-1].contents.push(descendents[i].innerHTML)
				}
			}
			this.section_links = sections;
		},
		get_set_data: function () {
			let Httpreq = new XMLHttpRequest(); // a new request
			Httpreq.open("GET",'config.json',false);
			Httpreq.send(null);
			let tmp_data = Httpreq.responseText;

			tmp_data = JSON.parse(tmp_data);

			this.readme_link = tmp_data.markdown_file_url;
			this.github_link = tmp_data.github_project_link;
			document.title = tmp_data.title;
		}
	},
	computed: {
		filtered_results: function() {
			let i;
			let results = [];
			for (i = 0; i < this.section_links.length; i++) {
				let data = "";
				let x;
				for (x = 0; x < this.section_links[i].contents.length; x++) {
					data = data + this.section_links[i].contents[x];
				}
				if (String(data).toLowerCase().includes(this.search.toLowerCase()) && this.search !== "") {
					results.push({section: this.section_links[i], data: data});
				}
			}
			return results;
		}
	}
});