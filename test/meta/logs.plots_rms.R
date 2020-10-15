library(ggplot2)
ds <- read.table('../.tmp/processed_logs/rms_values.csv', header = TRUE, sep = '\t')
ggplot(ds, aes(rms)) +
  geom_histogram() + 
  facet_grid(rows = vars(test))
