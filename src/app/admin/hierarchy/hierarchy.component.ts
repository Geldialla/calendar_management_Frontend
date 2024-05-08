import { AfterViewInit, Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements AfterViewInit {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = [
      {
        name: 'Parent',
        children: [
          { name: 'Child 1' },
          { name: 'Child 2' },
          {
            name: 'Child 3',
            children: [
              { name: 'Grandchild 1' },
              { name: 'Grandchild 2' }
            ]
          }
        ]
      }
    ];
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
