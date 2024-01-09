const entryList = document.getElementById('entryList');

	browser.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && 'tab' in changes) {
		update(changes.tab.newValue);
	}
});

function update(value) {
	console.log(value);
	entryList.innerHTML = '';
	for (const tab of value) {
		let anchor = document.createElement('a');
		anchor.innerText = tab.title;
		anchor.href = tab.url;
		
		let removeButton = document.createElement('button');
		removeButton.innerText = 'x';
		removeButton.addEventListener('click', () => {
			browser.storage.local.get('tab').then(result => {
				const newTabs = result.tab.filter((item) => 
					item.url !== tab.url	
				);
				return browser.storage.local.set({ tab: newTabs });
			});
		});

		let div = document.createElement('div');
		div.className = 'ellipsis';
		div.appendChild(removeButton);
		div.appendChild(anchor);

		let li = document.createElement('li');
		li.appendChild(div);

		entryList.appendChild(li);
	}
}

browser.storage.local.get('tab').then(result => update(result.tab));