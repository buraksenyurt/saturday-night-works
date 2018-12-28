class CategoryDAO(object):

    def __init__(self):
        self.categories=[]
    
    def getById(self,id):
        return [c for c in self.categories if c['id'] == id]

    def getAll(self):
        return self.categories

    def add(self,data):
        self.categories.append(data)

    def update(self,id,data):
        category = [c for c in self.categories if c['id'] == id]
        category[0]['name'] = data['name']
        category[0]['count'] = data['count']    

    def delete(self,id):
        category=self.getById(id)
        self.categories.remove(category[0])

