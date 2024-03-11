interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}

export interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
