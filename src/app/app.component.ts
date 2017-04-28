import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <p>{{name}}</p>
    Add to your homescreen by dragging down
  `,
})
export class AppComponent  { name = 'TypeScript Progressive Web App'; }
