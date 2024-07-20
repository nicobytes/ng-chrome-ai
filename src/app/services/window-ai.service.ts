import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowAiService {

  constructor() { }

  async checkAIEnabled() {
    const windowRef = window as unknown as any;
    const rta = await windowRef.ai.canCreateTextSession();
    return rta === 'readily';
  }

  getMarkdown() {
    const textMd = '## Markdown\n\nThis is a markdown text';
    return textMd;
  }
}
