export function getCollectionEntry<T extends { _meta: { path: string } }>(
  collection: T[],
  path: string,
) {
  return collection.find((e) => e._meta.path === path);
}
