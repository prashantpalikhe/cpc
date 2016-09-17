import './app.css';

const AppComponent = {
    transclude: true,
    controller: function FriendsAppController($element, $scope, friendsService) {
        var vm = this;

        var drawer;

        vm.nowPlayingEpisode = null;
        vm.episodesData = null;

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;
        vm.search = search;

        vm.$postLink = postLink;

        activate();

        function activate() {
            getNowPlayingEpisode();
            getFriendsEpisodesData();
        }

        function getNowPlayingEpisode() {
            vm.nowPlayingEpisode = friendsService.getNowPlayingEpisode();
        }

        function getFriendsEpisodesData() {
            friendsService
                .getEpisodesData()
                .then(function onEpisodesDataReceived(result) {
                    vm.episodesData = result;
                });
        }

        function postLink() {
            drawer = $element.find('drawer').controller('drawer');
        }

        function showMenu() {
            drawer.showDrawer();
        }

        function hideMenu() {
            drawer.hideDrawer();
        }

        function search(query) {
            friendsService.searchByTitle(query).then(function (filteredEpisodesData) {
                vm.episodesData = filteredEpisodesData;
            });
        }

        $scope.$on('$locationChangeSuccess', function () {
            hideMenu();
            activate();
        });
    },
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