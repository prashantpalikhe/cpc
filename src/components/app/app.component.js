import './app.css';
import controller from './app.controller';

const AppComponent = {
    transclude: true,
    controller,
    template: `
        <header class="header">
            <button ng-click="$ctrl.showMenu()" class="header__btn material-icons">menu</button>
        
            <a class="header__logo" href="#/" title="Go to episodes list">
                <img class="header__logo__img" src="/img/logo.jpg" alt="Friends logo">
            </a>
        </header>
        
        <ng-view></ng-view>
        
        <drawer>
            <nav class="nav">
                <div class="nav-header">
                    <button ng-click="$ctrl.hideMenu()" class="nav__hide-drawer material-icons">close</button>
                </div>
        
                <div class="nav-body">
                    <navigation></navigation>
                </div>
            </nav>
        </drawer>
    `
};

export default AppComponent;