import React, { Component } from 'react';
import { View, Button} from 'react-native';
import SelectMultiple from 'react-native-select-multiple'

export default class MultiSelectExample extends Component {
  state = { selectedFruits: [] }
  fruits = [
       { label: 'Apples', value: 'appls' },
       { label: 'Oranges', value: 'orngs' },
       { label: 'Pears', value: 'pears' }
     ]

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  render () {
    return (
      <View>
        <SelectMultiple
          items={this.fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />
      </View>
    )
  }
}