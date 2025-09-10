class ModalState {
  public value: boolean = $state();
  constructor(state: boolean) {
    this.value = state;
  }
  setTrue() {
    this.value = true;
  }
  setFalse() {
    this.value = false;
  }
  toggle() {
    this.value = !this.value;
  }
}


export const postModal = new ModalState(false);


