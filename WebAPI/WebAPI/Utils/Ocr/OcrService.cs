using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.Ocr
{
    public class OcrService
    {
        //colocar key do computer vision do portal azure
        private readonly string _subscriptKey = "7e538fa65b724c49b90192e94d3a3a87";

        private readonly string _endpoint = "https://cvvitalhubcampos.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptKey))
                {
                    Endpoint = _endpoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {
                return "Erro ao reconhecer o texto :" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            try
            {
                string recognizedText = "";

                foreach (var region in result.Regions) 
                {
                    foreach(var line in region.Lines) 
                    {
                        foreach (var word in line.Words)
                        {
                            recognizedText += word.Text + " ";
                        }

                        recognizedText += "\n";
                    }
                }

                return recognizedText;

               
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
