export default function (e, c) {
  e.BlockManager.add("tabs", {
    label: "Tabs Block",
    media: "<span class='fa fa-rocket'></span>",
    content: `
    <div class="css-tabs-container">
    <label class="css-tab-label">Tab 1 <input type="radio" name="tab-select" class="css-tab-input"/> </label>
    <div class="css-tab-content container-fluid">
      <h2>Tab 1 Content
      </h2>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
        tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
        semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
    </div>
    <label class="css-tab-label">Tab 2 <input type="radio" class="css-tab-input"/></label>
    <div class="css-tab-content container-fluid">
      <h2>Tab 2 Content
      </h2>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
        tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
        semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
    </div>
  </div>`,
    category: "Development",
  });

  e.BlockManager.add("basic-label", {
    label: "Basic Label",
    media: "<span class='fa fa-rocket'></span>",
    content: `<label class="css-tab-label" style="min-height: 50px; border: 1px solid red; padding:1rem"><input type="radio"/>TEST TSETSET</label>`,
    category: "Development",
  })
  
}
