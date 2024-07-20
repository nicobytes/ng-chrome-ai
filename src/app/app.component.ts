import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';

import { WindowAiService } from './services/window-ai.service';

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarkdownComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  #windowAiService = inject(WindowAiService);
  $isAiEnabled = toSignal(this.#windowAiService.checkAIEnabled(), {
    initialValue: false,
  });
  $context = toSignal(this.#windowAiService.getContext(), { initialValue: '' });
  $isChatOpen = signal(false);
  messageCtrl = new FormControl('', { nonNullable: true });
  $history = signal<Message[]>([]);

  toogleChat() {
    this.$isChatOpen.update((isOpen) => !isOpen);
  }

  async sendMessage() {
    const message = this.messageCtrl.value;
    if (!message) {
      return;
    }
    this.$history.update((history) => [
      ...history,
      {
        type: 'user',
        text: message,
        id: `${Date.now().toString()}-${Math.random()}`,
      },
    ]);
    this.messageCtrl.setValue('');
    // const context = this.$context();
    const response = await this.#windowAiService.getResponse(message);
    this.$history.update((history) => [
      ...history,
      {
        type: 'bot',
        text: response,
        id: `${Date.now().toString()}-${Math.random()}`,
      },
    ]);
  }
}
