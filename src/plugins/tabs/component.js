import { CONSTANTS, makeid } from ".";
// Tab component
export default function (e, c) {
  // Tab Container Defintion
  e.Components.addType("tab-container", {
    extend:'default',
    model: {
      defaults: {
        name: "Tab Container",
        tagName: "div",
        tabList: [1, 2, 3],
        traits: [
          {
            type: "vue-stackable-list",
            name: "tabList",
            label: "Manage Tabs",
            category: "Manage Tabs",
            changeProp: true,
            descriptorKey: "tabList",
            addAction: function (target) {
              debugger
              target.append(`<label class="css-tab-label">New Tab  <input type="radio" class="css-tab-input"/></label>
              <div class="css-tab-content container-fluid">
                <h2>New Tab Content
                </h2>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                  tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                  semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                </p>
              </div>`)
            }
          },
        ],
      },
      init() {
        this.on('component:update:tabList', this.handleTabList)
        // this.on('component:update', this.handleChange);
        // this.listenTo(this, this.updateTabList);
        // this.listenTo(this, 'change:tabList', this.updateTabList);
      },
      handleChange(...args) {
        debugger
        console.log(args)
        this.tabList = this.components().reduce((a,c, idx) => {
          
          return [...a, {id: c.getAttributes().id, label: c.getAttributes().label}]
        }, [])
        this.getTrait('tabList').setValue(this.tabList)
        
      },
      handleTabList(...args) {
        debugger
        this.getTrait('tabList').setValue(this.tabList)
      }
    },
    isComponent: function (el) {
      return el.tagName === "DIV" && el.classList.contains(CONSTANTS.CONTAINER);
    },
  });

  // Tab Label Definition
  e.Components.addType("tab-label", {
    extend: "text",
    model: {
      defaults: {
        tagName: "label",
        name: "Tab Label",
        traits: ["id"],
        toolbar: [{
          label: "<i class='fa fa-plus'></i> ",
          name: "Add Tab",
          command: (...args) => {
            args[0].getSelected().parent().append(`<label class="css-tab-label">New Tab  <input type="radio" class="css-tab-input"/></label>
            <div class="css-tab-content container-fluid">
              <h2>New Tab Content
              </h2>
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
            </div>`)
          }
        }],
        draggable: CONSTANTS.CONTAINER,
        highlightable: false,
        
        attributes: {
          style: "margin:2rem; pointer-events:all",
        },
      },
    },
    isComponent: function (el) {
      return el.tagName === "LABEL" && el.classList.contains(CONSTANTS.LABEL);
    },
    view: {
      onRender() {
        this.el.addEventListener('click', (ev) => {
          
          let labelModels = this.model.parent().components().filter(c=>c.get('type') == 'tab-label')
          labelModels.forEach(l => { 
            l.components().find(i => i.get('type') == 'tab-input').removeAttributes('checked')
          })
          this.model.components().find(i => i.get('type') == 'tab-input').addAttributes({
            checked: true
          })
        })
      }
    }
  });

  //Tab Input Definition
  e.Components.addType("tab-input", {
    model: {
      defaults: {
        tagName: "input",
        name: "Tab Input",
        draggable: false,
        highlightable: false,
        attributes: {
          type: "radio",
          style:"pointer-events:none",
          name: "tab-select",
        },
      },
      init() {
        this.on('change:attributes:checked', this.handleChange);
      },
      handleChange() {
        let isChecked = this.getAttributes().checked
        if(isChecked) {
          this.view.el.checked = true  
        } else {
          delete this.view.el.checked
        }
      }
    },
    isComponent: function (el) {
      return el.tagName === "INPUT" && el.classList.contains(CONSTANTS.INPUT);
    },
    view: {
      onRender() {
        if(!this.model.tabContainer) {
          let parent = this.model.parent();
          while (!!parent.parent() && parent.get('type') != 'tab-container') {
            parent = parent.parent();
          this.model.tabContainer = parent;  
        }
        this.model.addAttributes({name: this.model.tabContainer.getId()})
        }
      }
    }
    
  });
  // Tab Content Definition
  e.Components.addType("tab-content", {
    model: {
      defaults: {
        tagName: "div",
        name: "Tab Content",
        attributes: {
          class: CONSTANTS.CONTENT,
        },
      },
    },
    isComponent: function (el) {
      return (
        el.tagName === "DIV" && el.classList.contains(CONSTANTS.CONTENT)
      );
    },
    
  });
}
