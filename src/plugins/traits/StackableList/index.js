import StackableList from './StackableList.vue'
import {createApp} from 'vue'

export default function(e,c) {
  e.TraitManager.addType('vue-stackable-list', {
      noLabel: true,
      createInput({ trait }) {
        const el = document.createElement('div');
        el.style.width = '100%';
        el.style.height = 'auto';
        trait.traitUI = createApp( StackableList, {
          onChange: (value) => {
            this.onChange(value)
          },
          label: trait.getLabel() || 'Stackable List',
          value: trait.getValue(),
          addAction: trait.get('addAction').bind(trait, trait.target),
        }).mount(el);
        return trait.traitUI.$el;
      },
      onEvent({component,trait}) {
        debugger
        trait.setValue(trait.traitUI.getValue());

        
      },
      onUpdate({component, trait}) {
        debugger
        trait.traitUI.setValue(trait.getValue());
      },
      getValue() {
        debugger
      }
    });
}