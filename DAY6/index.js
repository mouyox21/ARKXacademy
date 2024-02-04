const { readFileAsync, writeFileAsync, processFiles } = require('./fileOperations.js');

const main = async () => {
  try {
    const file1Content = await readFileAsync('./DAY6/modifiedFile.txt');
    console.log(file1Content);
    

    const processedContent = await processFiles(['./DAY6/modifiedFile.txt', './DAY6/modifiedFileMOD.txt', './DAY6/modifiedFileMOD2.txt']);
    
    let modifiedContent = `${file1Content}\nThis is added from Program`;

    await writeFileAsync('./DAY6/modifiedFile.txt', modifiedContent);

    console.log('File processing complete:', processedContent);
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

main();
