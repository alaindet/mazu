import { Component, HostListener, OnInit } from '@angular/core';
import packageJson from '../../../../../package.json';

import { DEMO_COMPONENTS_ROUTES } from './routes';

@Component({
	templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class DemoComponentsFeatureComponent implements OnInit {

  version!: string;
	routes: { label: string; url: string; }[] = [];
	isNavVisible = false;

	ngOnInit() {
    this.version = packageJson.version;
		this.routes = DEMO_COMPONENTS_ROUTES.map(route => ({
			label: route.data.label,
			url: `/components/${route.path}`,
		}));
	}

	onPreventClick(event: MouseEvent): void {
		event.stopImmediatePropagation();
	}

	onOpenNav(event: MouseEvent): void {
		this.onPreventClick(event);
		this.isNavVisible = true;
	}

	onCloseNav(event: MouseEvent): void {
		this.onPreventClick(event);
		this.isNavVisible = false;
	}

	@HostListener('click')
	onClickAway(): void {
		this.isNavVisible = false;
	}
}
