import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowAiService {
  #http = inject(HttpClient);
  session: any;

  constructor() {}

  checkAIEnabled() {
    return from(
      new Promise(async (resolve) => {
        const windowRef = window as unknown as any;
        const rta = await windowRef.ai.canCreateTextSession();
        const isAiEnabled = rta === 'readily';
        if (isAiEnabled) {
          this.session = await windowRef.ai.createTextSession();
        }
        resolve(isAiEnabled);
      }),
    );
  }

  getContext() {
    return this.#http.get('/assets/context.md', { responseType: 'text' });
  }

  async getResponse(message: string) {
    if (!this.session) {
      throw new Error('AI is not enabled');
    }
    const prompt = `You are a helpful assistant. User: ${message}`;
    return this.session.prompt(prompt);
  }

  async getResponseWithContext(message: string, context: string) {
    if (!this.session) {
      throw new Error('AI is not enabled');
    }
    const systemPrompt = `You are a helpful travel assistant and you should solve the user questions based the following article: ${context}
    
    User: ${message}
    Model:`;
    return this.session.prompt(systemPrompt);
  }
}
