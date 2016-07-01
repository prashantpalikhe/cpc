import './drawer.css';
import controller from './drawer.controller';

const DrawerComponent = {
    transclude: true,
    controller,
    template: `
        <div class="drawer-backdrop"></div>
        <div class="drawer-edge"></div>
        <aside class="drawer" ng-transclude></aside>
    `
};

export default DrawerComponent;