export function addOffSet(map) {
    const offSetY = map.getSize().y * 0.15;
    map.panBy([0, -offSetY], {animate: false})
}
