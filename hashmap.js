class LinkNode {
  constructor(data, next=null) {
    this.data = data;
    this.next = next;
  }
}

class LinkList {
  constructor(root=null) {
    this.root = root;
  }
  
  insertFront(data) {
    let node = new LinkNode(data);
    let temp = this.root;
    this.root = node;
    this.root.next = temp;
    return this.root;
  }
  
  insertBack(data){
    let node = new LinkNode(data);
    if(!this.root){
      this.root = node;
      return
    }
    list = this.root;
    while(list.next !== undefined){
      if(!list.next){
        list.next = node;
        break;
      }
      list=list.next
    }
    
    return list.next;
  }
  
  insertAtIndex(data, index) {
    let node = new LinkNode(data);
    let current = this.root;
    for (var i=0; i<index; i++) {
      current = current.next;
    }
    temp = current.next;
    current.next = node;
    node.next = temp;
  }
}

class HashMap {
  constructor(hashFunc, size) {
    this.hashFunc = hashFunc;
    this.size = size;
    this.buckets = new Array(size);
  }
  
  put(data) {
    // Only working with strings for now
    if(typeof(data) !== 'string') {
      console.log('Please enter a string');
      return;
    }
    
    let hashObj = this.hashFunc(data, this.size);
    let newData;
    if(this.buckets[hashObj.index]) {
      newData = this.buckets[hashObj.index].insertFront(data);
    } else {
      this.buckets[hashObj.index] = new LinkList();
      newData = this.buckets[hashObj.index].insertFront(data);
    }
    
    return {
      id: hashObj.id,
      data: newData.data
    }
  }
  
  get(key) {
    let hashObj = this.hashFunc(key, this.size);
    let node = this.buckets[hashObj.index].root;
    while(node.next) {
      node = node.next;
    }

    return {
      id: hashObj.id,
      data: node.data
    }
  }
}

function hashing(data, size) {
  let hashedId = 0;
  if(typeof(data) === 'string') {
    for(var i = 0; i < data.length; i++) {
      hashedId += data.charCodeAt(i);
    } 
  } else {
    hashedId = data;
  }
  
  return {
    id: hashedId,
    index: hashedId % size
  };
}

