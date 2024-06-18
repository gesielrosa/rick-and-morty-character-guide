import { signal, WritableSignal } from '@angular/core';
import { SIGNAL, SignalNode, signalSetFn } from '@angular/core/primitives/signals';

export function localStorageSignal<T>(key: string, initialValue?: T): WritableSignal<T> {
  const output = signal<T>(JSON.parse(localStorage.getItem(key) || 'null') || initialValue || null);
  const node = output[SIGNAL] as SignalNode<T>;

  output.set = (value: T): void => saveValue(node, key, value);
  output.update = (signalUpdateFn: (x: T) => T) => saveValue(node, key, signalUpdateFn(node.value));

  return output;
}

function saveValue<T>(node: SignalNode<T>, key: string, newValue: T): void {
  localStorage.setItem(key, JSON.stringify(newValue));
  signalSetFn(node, newValue);
}
