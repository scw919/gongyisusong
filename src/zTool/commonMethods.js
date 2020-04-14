import store from '@/store';
// actions
import { changeMenuIndex } from '@/store/actions';
const matchUrlToMenu = function (match) {
    let newMenuIndex, cur_url = match.url;
    console.log(cur_url, 'cur_url')
    switch (cur_url) {
        case '/index':
            newMenuIndex = 0;
            break;
        case '/main':
            newMenuIndex = 1;
            break;
    }
    console.log(newMenuIndex);
    store.dispatch(changeMenuIndex(newMenuIndex))
}

export { matchUrlToMenu }