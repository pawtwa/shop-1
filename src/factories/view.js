import viewProto from './../prototypes/view';

function view(assignments) {
    const view = Object.create(viewProto);
    if (typeof assignments === 'object') {
        Object.assign(view, assignments);
    }
    return view;
}

export default view;
