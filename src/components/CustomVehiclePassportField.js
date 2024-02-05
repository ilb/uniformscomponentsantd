import { connectField } from 'uniforms';
import { AutoField, SelectField } from 'uniforms-antd';

const CustomVehiclePassportField = ({
    isEpts,
  ...props
}) => {

  const maskValueVehiclePassportNumber = (e, isEpts) => {
    if (!isEpts) {
      const value = e && e.target && e.target.value ? e.target.value.replace(/ /g, '') : '';
      const arr = value.split('');
      const valueArr = [];
      for (let i = 0; i < 10; i++) {
        if (i < arr.length) {
          switch (i) {
            case 2:
              valueArr.push(' ');
              if (/[A-Za-zА-Яа-я]/.test(arr[i])) {
                valueArr.push(arr[i]);
              } else (
                valueArr.push('')
              )
              break;
            case 3:
              if (/[A-Za-zА-Яа-я]/.test(arr[i])) {
                valueArr.push(arr[i]);
              } else (
                valueArr.push('')
              )
              break;
            case 4:
              valueArr.push(' ');
              if (!Number(arr[i])) {
                valueArr.push('');
              } else (
                valueArr.push(arr[i])
              )
              break;
            case 0:
            case 1:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              if (!Number(arr[i])) {
                valueArr.push('');
              } else (
                valueArr.push(arr[i])
              )
              break;
            default:
              valueArr.push(arr[i]);
          }
        }
      }
      const cursorPosition = e && e.target ? e.target.selectionStart : 0;
      if (
        e &&
        e.nativeEvent &&
        e.nativeEvent.inputType !== 'deleteContentBackward' &&
        e.nativeEvent.inputType !== 'deleteContentForward'
      ) {
        if (cursorPosition === 3 || cursorPosition === 6) cursorPosition++;
      }
      const newValue = valueArr.join('');
      if (e && e.target) {
        e.target.value = newValue.toUpperCase();
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    } else {
      const value = e && e.target && e.target.value ? e.target.value.replace(/ /g, '') : '';
      const arr = value.split('');
      const valueArr = [];
      for (let i = 0; i < 15; i++) {
        if (i < arr.length) {
          if (!Number(arr[i])) {
            valueArr.push('');
          } else (
            valueArr.push(arr[i])
          )
        }
      }
      const cursorPosition = e && e.target ? e.target.selectionStart : 0;
      const newValue = valueArr.join('');
      if (e && e.target) {
        e.target.value = newValue.toUpperCase();
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  };

  return (
    <AutoField {...props} name="" onInput={(e) => maskValueVehiclePassportNumber(e, isEpts)} />
  );
};
export default connectField(CustomVehiclePassportField);
