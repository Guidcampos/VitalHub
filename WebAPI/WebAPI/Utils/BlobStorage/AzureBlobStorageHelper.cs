using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                //VERIFICA SE EXISTE UM ARQUIVO
                if (arquivo != null)
                {
                    //GERA UM NOME UNICO + EXTENSAO DO ARQUIVO
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

                    //CRIAR UMA INSTANCIA DO CLIENT BLOBSERVICE E PASSA A STRING DE CONEXAO
                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    //OBTEM UM CONTAINER CLIENT USANDO O NOME DO CONTAINER DO BLOB
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //OBTEM UM BLOB CLIENT USANDO O NAME
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //ABRE O FLUXO DE ENTRADA DO ARQUIVO(FOTO)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //CARREGA O ARQUIVO(FOTO) PARA O BLOB STORAGE DE FORMA ASSINCRONA 
                        await blobClient.UploadAsync(stream, true);
                    }
                    //RETORNA A URI DO BLOB COMO STRING
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //imagem padrao
                    return "https://blobvitalhubg13campos.blob.core.windows.net/containervitalhub/profilepattern.png";
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
