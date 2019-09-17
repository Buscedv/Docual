function get_data() {
	let path_to_source = document.getElementById('markdown_file_url').value;
	let Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",path_to_source,false);
	Httpreq.send(null);
	let source = Httpreq.responseText;

	let converter = new showdown.Converter({tables: 'true', tasklists: 'true', strikethrough: 'true'}),
			html      = converter.makeHtml(source);
	document.getElementById('raw_source').innerHTML = html;
	console.log(html);

	let ancestor = document.getElementById('raw_source'),
			descendents = ancestor.getElementsByTagName('*');

	let i;
	let sections = [];
	let sections_content = [];
	let tmp_section_content = [];

	let is_section = false;

	for (i = 0; i < descendents.length; i++) {
		if (is_section && !$(descendents[i]).is('h1')) {
			tmp_section_content.push(descendents[i])
		}
		if ($(descendents[i]).is('h1')) {
			sections.push(descendents[i]);
			if (is_section === true) {
				sections_content.push(tmp_section_content);
				tmp_section_content = [];
			} else {
				is_section = true;
			}
		} else if (i === descendents.length-1) {
			sections_content.push(tmp_section_content);
			tmp_section_content = [];
			is_section = false;
		}

	}
	console.log(sections);
	console.log(sections_content);

	let tmp_section;
	let x;
	for (x = 0; x < sections.length; x++) {
		let a = document.createElement('a');
		let linkText = document.createTextNode("my title text");
		a.appendChild(linkText);
		a.title = sections_content[x][0].text;
		a.href = "#"+sections[x].id;
		document.getElementById('sections_nav').appendChild(a);

		let section = document.createElement('div');
		section.setAttribute("class", "section");
		section.setAttribute("id", sections[x].id+"_section");
		document.getElementById('sections').appendChild(section);
		tmp_section = document.getElementById(sections[x].id+"_section");

		tmp_section.appendChild(sections[x]);

		let y;
		for (y = 0; y < sections_content[x].length; y++) {
			tmp_section.appendChild(sections_content[x][y])
		}

	}

}