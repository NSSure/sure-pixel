import Canvas from '../common/canvas';

const SureToast = {
    install(Vue, options) {
        Vue.prototype.$sureCanvas = new Canvas(options);
    }
}

export default SureToast;