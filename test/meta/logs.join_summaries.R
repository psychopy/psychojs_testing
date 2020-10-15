ds_joined = NULL
for (i in 1 : 3) {
  ds_new = read.table(paste0("summary_deviation ", i, ".csv"), header = TRUE)
  ds_new = ds_new[,c("platform", "deviation.x", "deviation.y")]
  names(ds_new)[c(2, 3)] = paste0(c("deviation.x", "deviation.y"), i)
  if (is.null(ds_joined)) {
    ds_joined = ds_new
  } else {
    ds_joined = merge(ds_joined, ds_new, by = "platform")
  }
}
write.table(ds_joined, "summary_deviation_joined.csv", sep = "\t", row.names = FALSE)
