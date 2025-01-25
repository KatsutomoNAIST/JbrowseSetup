# JbrowseSetup
## Jbrowse CLI set up for Shiny embedments
JBrowseR may be simpler, consider it first if possible
<br/>
1. Create a folder and change the working directory to it. Place the index.html file in it. 
```
mkdir ~/Documents/JBrowse
cd ~/Documents/JBrowse
```
<br/>
2. install NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
```
<br/>
3. Install jbrowse and check if Jbrowse is

```
npm install -g @jbrowse/cli
jbrowse --help
```
This should give JBrowse2 instructions
<br/>
4. `npx serve` should start hosting, but before starting the server, prepare the contents
<br/>
<br/>
5. Add assemblies to JBrowse. Here is an example of public human genome 

```
jbrowse add-assembly https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/fasta/GRCh38.fa.gz \
--name GRCh38 \
--alias hg38 \
--refNameAliases http://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/GRCh38.aliases.txt \
--skipCheck
```
This code will give `Added assembly "GRCh38" to config.json` when successfully done.
<br/>
<br/>
6. Add tracks

```
jbrowse add-track https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz --name "NCBI RefSeq Genes" --category "Genes" --config '{"renderer": {"type": "SvgFeatureRenderer"}}' --skipCheck
jbrowse add-track https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/alignments/NA12878/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram --name "NA12878 Exome" --category "1000 Genomes, Alignments" --skipCheck
jbrowse add-track https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/variants/ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf.gz --name "1000 Genomes Variant Calls" --category "1000 Genomes, Variants" --skipCheck
```
<br/>
7. Add another assembly. This example gives mm39 hosted on our Cyverse server

```
jbrowse add-assembly https://data.cyverse.org/dav-anon/iplant/home/okamuralab/Images/Tracks/mm39.fa.gz \
 --name mm39 \
 --alias GRCm39 \
 --skipCheck   
```
<br/>
8. Add mouse and human tracks

```
jbrowse add-track https://data.cyverse.org/dav-anon/iplant/home/okamuralab/Images/Tracks/gencode.vM36.annotation.sorted.gff3.gz --name "Gencode M36 Genes" --category "Genes" --config '{"renderer": {"type": "SvgFeatureRenderer"}}' --assemblyNames "mm39" --skipCheck
jbrowse add-track https://data.cyverse.org/dav-anon/iplant/home/okamuralab/trackhub/YumaHanai/AlphaFold/mmu_AlphaFold_score.bb --name "AF2 pLDDT score" --assemblyNames "mm39" --skipCheck
jbrowse add-track https://data.cyverse.org/dav-anon/iplant/home/okamuralab/trackhub/YumaHanai/gRNA/mmu_gRNA_TOP3.bb --name "pre-designed sgRNA" --assemblyNames "mm39" --skipCheck
```
```
jbrowse add-track https://data.cyverse.org/dav-anon/iplant/home/okamuralab/trackhub/YumaHanai/AlphaFold/hsa_AlphaFold_score.bb --name "AF2 pLDDT score" --assemblyNames "hg38" --skipCheck
jbrowse add-track https://data.cyverse.org/dav-anon/iplant/home/okamuralab/trackhub/YumaHanai/gRNA/hsa_gRNA_TOP3.bb --name "pre-designed sgRNA" --assemblyNames "hg38" --skipCheck
```

<br/>
9. Configure your Jbrowse window. config.json may not be accessible if a web browser is used. I added configuration codes in index.html directly.
<br/>
<br/>
10. Then start the server. You need config.json file in the same folder if the configuration is there.

```
npx serve 
```
<br/>
11. Use the IP address:port for accessing JBrowse. The Shiny R code can be

```
library(shiny)

ui <- fluidPage(
  titlePanel("JBrowse Embedded in Shiny"),
  sidebarLayout(
    sidebarPanel(
      # Add any inputs or controls here
    ),
    mainPanel(
      # Use an iframe to embed JBrowse
      tags$iframe(
        src = "http://localhost:3000/?loc=chr1:4,559,545..4,568,726"
      )
    )
  )
)

server <- function(input, output) {
  # Server logic (if any)
}

shinyApp(ui = ui, server = server)
```
