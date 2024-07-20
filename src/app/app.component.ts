import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WindowAiService } from './services/window-ai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #windowAiService = inject(WindowAiService);
  $isAiEnabled = signal(false);

  ngOnInit() {
    this.checkAiEnabled();
  }

  async checkAiEnabled() {
    const rta = await this.#windowAiService.checkAIEnabled();
    this.$isAiEnabled.set(rta);
  }
}
