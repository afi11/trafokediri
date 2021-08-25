import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const InputDropdown = ({
  defaultValue,
  items,
  searchable,
  placeholder,
  error,
  onChangeItem,
}) => {
  return (
    <DropDownPicker
      items={items}
      defaultValue={defaultValue}
      searchable={searchable}
      placeholder={placeholder}
      placeholderStyle={{color: '#b2b2b2'}}
      containerStyle={{height: 45}}
      style={{
        backgroundColor: '#fafafa',
        borderColor: error != '' ? '#ff0000' : '#9b9b9b',
      }}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={onChangeItem}
    />
  );
};

export default InputDropdown;
