import './css/common.css';
import Layer from './components/layer/layer.js';

const App = function () {
	console.log(Layer);
	var dom = document.getElementById('app'),
		layer = new Layer();
	// dom.innerHTML = layer.tpl;
	dom.innerHTML = layer.tpl({
		name: 'john',
		arr: ['apple', 'xiaomi', 'oppo']
	});
}

new App();
