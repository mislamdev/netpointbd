type Releaser = () => void;

const queues = new Map<string, Promise<void>>();

export async function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const previous = queues.get(key) ?? Promise.resolve();
  let release: Releaser = () => {};
  const next = new Promise<void>((resolve) => {
    release = resolve;
  });
  queues.set(
    key,
    previous.then(() => next),
  );

  try {
    await previous;
    return await fn();
  } finally {
    release();
    if (queues.get(key) === previous.then(() => next)) {
      queues.delete(key);
    }
  }
}
