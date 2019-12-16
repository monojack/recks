import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateDomChildNodesPipe } from '../../dom/UpdateDomChildNodesPipe';
import { createComponent, IComponent } from '../Component';
import { IArrayChildrenRenderElements, renderArray } from './Array';
import { renderFn } from './Fn';
import { ITextRenderElement, renderLeaf } from './Leaf';
import { renderObservable } from './Observable';
import { IHTMLRenderElement, renderStatic } from './Static';

export type ICompiledComponent = ITextRenderElement | IHTMLRenderElement | IArrayChildrenRenderElements;

export const render = (definition, target) => {
    const root = createComponent(definition);

    const subscription =
        renderRootComponent(root, target)
        .subscribe();

    root.update$.next(definition);

    // TODO: add tests for unsubscription
    return subscription;
};

function renderRootComponent(component: IComponent, target: HTMLElement) {
    return renderComponent(component).pipe(
        map(el => [ el ]),
        UpdateDomChildNodesPipe(target)
    )
}

export function renderComponent(component: IComponent) : Observable<ICompiledComponent>{
    if (component.type == 'leaf') {
        return renderLeaf(component)
    } else if (component.type == 'fn') {
        return renderFn(component)
    } else if (component.type == 'static') {
        renderStatic(component);
    } else if (component.type == 'observable') {
        renderObservable(component);
    } else if (component.type == 'array') {
        return renderArray(component);
    }

    throw 'Unknown component type';
}
