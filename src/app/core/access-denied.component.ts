import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    template:
        `
  <div style="margin: 0;padding: 0;">
    <div class="wrapper" style="min-height: 400px;">
        <div class="error-div" style="padding: 128px 0;text-align: center;">
            <h1 style="font-size: 29px;
            line-height: 32px;
            margin-top: 16px;">Access Denied</h1>
            <p style="font-size: 14px;
            line-height: 24px; margin: 12px 0;">
            Return to <a href="javascript:window.history.go(-2)">previous page</a>
            or go back to the <a routerLink="/dashboard">dashboard</a>
            </p>
        </div>
    </div>
  </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent {
    btnDisabled = false;
    loading = false;

    constructor() { }
}
