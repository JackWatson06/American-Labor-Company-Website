
const selectSetup = () => {

    $(".js-select-2").select2({
        placeholder: "Trade *",
        tags: true,
        maximumSelectionLength: 1
      });

}


export { selectSetup };