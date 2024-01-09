browser.menus.create(
	{
		id: "Save Tab",
		title: "Save Tab",
		contexts: ["tab"], 
	},
);

browser.menus.onClicked.addListener(async(info, tab) => {
	if (info.menuItemId === "Save Tab") {

		let oldTab = (await browser.storage.local.get('tab')).tab;
		if (!(oldTab instanceof Array)) {
			oldTab = [];
		}
		oldTab.push({ url: tab.url, title: tab.title });

		await browser.storage.local.set({ tab: oldTab });
	}
});

