import org.mongodb.scala._
import scala.collection.mutable.ArrayBuffer
import scala.io.Source


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
    mongoClient.close()
  }
  
  
  
  
  def loadCSV(path : String): Array[String] = {
    val rows = ArrayBuffer[Array[String]]()
    
    for(line <- Source.fromFile(path).getLines()){
      println(line)
    }
    
    
    
  }
  
  
}
