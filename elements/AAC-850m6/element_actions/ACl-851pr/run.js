function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Insert Table")


    const rows = properties.rows;
    const columns = properties.columns;
    const with_header_row = properties.with_header_row;

    instance.data.editor.chain().focus().insertTable({ rows: rows, cols: columns, withHeaderRow: with_header_row }).run();


}