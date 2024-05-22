/* eslint-disable no-unused-vars -- Отключаем eslint no-unused-vars */
import { connectField } from "uniforms";
import { AutoField } from "uniforms-antd";

/**
 * @param {Object} props
 * @param {boolean} props.isEpts
 * @returns {JSX.Element}
 */
const CustomVehiclePassportField = ({
  isEpts,
  ...props
}) => {

  /**
   * @param {Event} e
   * @returns {void}
   */
  const maskValueVehiclePassportNumber = e => {
    if (!isEpts) {
      const value = e && e.target && e.target.value ? e.target.value.replace(/ /gu, "") : "";
      const crudeValue = e && e.target && e.target.value ? e.target.value : "";
      const deleteContent = e && e.nativeEvent && (e.nativeEvent.inputType === "deleteContentBackward" || e.nativeEvent.inputType === "deleteContentForward");
      let cursorPosition = e && e.target ? e.target.selectionStart : 0;
      const arr = value.split("");
      const valueArr = [];

      if (!deleteContent) {
        for (let i = 0; i < 10; i++) {
          if (i < arr.length) {
            switch (i) {
              case 2:
                valueArr.push(" ");
                if (/[A-Za-zА-Яа-я]/u.test(arr[i])) {
                  valueArr.push(arr[i]);
                } else {
                  (
                    valueArr.push("")
                  );
                }
                break;
              case 3:
                if (/[A-Za-zА-Яа-я]/u.test(arr[i])) {
                  valueArr.push(arr[i]);
                } else {
                  (
                    valueArr.push("")
                  );
                }
                break;
              case 4:
                valueArr.push(" ");
                if (isNaN(Number(arr[i]))) {
                  valueArr.push("");
                } else {
                  (
                    valueArr.push(arr[i])
                  );
                }
                break;
              case 0:
              case 1:
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
              case 10:
                if (isNaN(Number(arr[i]))) {
                  valueArr.push("");
                } else {
                  (
                    valueArr.push(arr[i])
                  );
                }
                break;
              default:
                valueArr.push(arr[i]);
            }
          }
        }
      } else if (deleteContent) {
        const crudeArr = crudeValue.split("");

        for (let i = 0; i < 12; i++) {
          if (i < crudeArr.length) {
            valueArr.push(crudeArr[i]);
          }
        }
      }
      if (
        e &&
        e.nativeEvent &&
        e.nativeEvent.inputType !== "deleteContentBackward" &&
        e.nativeEvent.inputType !== "deleteContentForward"
      ) {
        if (cursorPosition === 3 || cursorPosition === 6) {
          cursorPosition++;
        }
      }
      const newValue = valueArr.join("");

      if (e && e.target) {
        e.target.value = newValue.toUpperCase();
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    } else {
      const value = e && e.target && e.target.value ? e.target.value.replace(/ /gu, "") : "";
      const arr = value.split("");
      const valueArr = [];

      for (let i = 0; i < 15; i++) {
        if (i < arr.length) {
          if (isNaN(Number(arr[i]))) {
            valueArr.push("");
          } else {
            (
              valueArr.push(arr[i])
            );
          }
        }
      }
      const cursorPosition = e && e.target ? e.target.selectionStart : 0;
      const newValue = valueArr.join("");

      if (e && e.target) {
        e.target.value = newValue.toUpperCase();
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  };

  return (
    <AutoField {...props} name="" onInput={e => maskValueVehiclePassportNumber(e)} />
  );
};

export default connectField(CustomVehiclePassportField);
/* eslint-enable no-unused-vars -- Возвращаем eslint no-unused-vars */
