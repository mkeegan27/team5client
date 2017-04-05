import org.mongodb.scala._;


object main{
  def main(args: Array[String]): Unit = {
    val mongoClient: MongoClient = MongoClient()
    val database: MongoDatabase = mongoClient.getDatabase("CrimsonEagle")
    val collection: MongoCollection[Document] = database.getCollection("test")
      
    val doc: Document = Document("_id" -> 0, "name" -> "Data")
    collection.insertOne(doc).subscribe(new Observer [Completed] {
        
      override def onNext(result: Completed): Unit = println("Inserted")

      override def onError(e: Throwable): Unit = println("Failed")

      override def onComplete(): Unit = println("Completed")

    })
    
    collection.drop()
    mongoClient.close()
  }
}
