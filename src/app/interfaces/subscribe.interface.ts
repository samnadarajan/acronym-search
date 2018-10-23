/**
 * Use when you need to subscribe to observables in a component. This will ensure subscriptions
 * are destroyed when components are destroyed.
 */
export interface ISubscribe {
    setupSubscriptions(): void;
    destroySubscriptions(): void;
}
