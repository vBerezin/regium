import { App } from '~common/scripts/app';
import { LazyLoader } from '~common/scripts/lazy-loader';
import { documentReady } from '~common/scripts/utils/document-ready';

documentReady(LazyLoader.init);

global.App = App;
App.breakpoints.change(App.debug);

App.stream.on('store.updated', (data) => {
  console.log('store.updated', data);
});
