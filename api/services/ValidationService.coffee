
module.exports =
  translate: (model, err) ->
    for name, value of err?.invalidAttributes
      return t if t = model?.validation?[name]?[value?[0]?.rule]
    return err
