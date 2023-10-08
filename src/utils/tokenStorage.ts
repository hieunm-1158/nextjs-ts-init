const tokenStorage = {
  set({ key, value }: { key: string; value: string }) {
    localStorage.setItem(key, value);
  },
  get(key: string) {
    return localStorage.getItem(key);
  },
  remove(keys: string[]) {
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  },
};

export default tokenStorage;
