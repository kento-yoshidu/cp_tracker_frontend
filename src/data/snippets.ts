export type Snippet = {
  id: string;
  title: string;
  code: string;
};

export const snippets: Snippet[] = [
  {
    id: "union-find",
    title: "Union Find",
    code: `#[derive(Debug)]
pub struct UnionFind {
    parent: Vec<usize>,
    size: Vec<usize>,
}

impl UnionFind {
    pub fn new(n: usize) -> Self {
        Self {
            parent: (0..n).collect(),
            size: vec![1; n],
        }
    }

    pub fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            let root = self.find(self.parent[x]);

            self.parent[x] = root;
        }

        self.parent[x]
    }

    pub fn unite(&mut self, x: usize, y: usize) -> bool {
        let mut x = self.find(x);
        let mut y = self.find(y);

        if x == y {
            return false;
        }

        if self.size[x] < self.size[y] {
            std::mem::swap(&mut x, &mut y);
        }

        self.parent[y] = x;
        self.size[x] += self.size[y];

        true
    }

    pub fn same(&mut self, x: usize, y: usize) -> bool {
        self.find(x) == self.find(y)
    }

    pub fn size(&mut self, x: usize) -> usize {
        let root = self.find(x);

        self.size[root]
    }

    pub fn count_roots(&mut self, n: usize) -> usize {
        (1..=n)
            .map(|i| self.find(i))
            .collect::<HashSet<_>>()
            .len()
    }
}
    `
  }
];
