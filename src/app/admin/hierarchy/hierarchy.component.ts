import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];

// /** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }

// /**
//  * @title Tree with flat nodes
//  */
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent {

  // ds = {
  //   id: '1',
  //   name: 'Lao Lao',
  //   title: 'general manager',
  //   children: [
  //     { id: '2', name: 'Bo Miao', title: 'department manager' },
  //     {
  //       id: '3',
  //       name: 'Su Miao',
  //       title: 'department manager',
  //       children: [
  //         { id: '4', name: 'Tie Hua', title: 'senior engineer' },
  //         {
  //           id: '5',
  //           name: 'Hei Hei',
  //           title: 'senior engineer',
  //           children: [
  //             { id: '6', name: 'Dan Zai', title: 'engineer' },
  //             { id: '7', name: 'Dan Dan', title: 'engineer' },
  //             { id: '8', name: 'Xiang Xiang', title: 'engineer' },
  //             { id: '9', name: 'Ke Xin', title: 'engineer' },
  //             { id: '10', name: 'Xiao Dan', title: 'engineer' },
  //             { id: '11', name: 'Dan Dan Zai', title: 'engineer' }
  //           ]
  //         },
  //         { id: '12', name: 'Pang Pang', title: 'senior engineer' },
  //         { id: '13', name: 'Er Pang', title: 'senior engineer' },
  //         { id: '14', name: 'San Pang', title: 'senior engineer' },
  //         { id: '15', name: 'Si Pang', title: 'senior engineer' }
  //       ]
  //     },
  //     { id: '16', name: 'Hong Miao', title: 'department manager' },
  //     { id: '17', name: 'Chun Miao', title: 'department manager' },
  //     { id: '18', name: 'Yu Li', title: 'department manager' },
  //     { id: '19', name: 'Yu Jie', title: 'department manager' },
  //     { id: '20', name: 'Yu Wei', title: 'department manager' },
  //     { id: '21', name: 'Yu Tie', title: 'department manager' }
  //   ]
  // };

  // constructor() { }

  // ngOnInit() {
  // }

  // selectNode(nodeData: { name: string, title: string }) {
  //   alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
  // }

}
