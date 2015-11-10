Attribute VB_Name = "NewMacros"
Sub ¶©µ¥ÕûÀí()
Attribute ¶©µ¥ÕûÀí.VB_Description = "ºêÓÉ Amos Â¼ÖÆ£¬Ê±¼ä: 2015/10/23"
Attribute ¶©µ¥ÕûÀí.VB_ProcData.VB_Invoke_Func = " 14"
'
' ¶©µ¥ÕûÀí Macro
' ºêÓÉ Amos Â¼ÖÆ£¬Ê±¼ä: 2015/10/23
'

'
    Columns("A:B").Select
    Selection.Delete Shift:=xlShiftToLeft
    Columns("B:E").Select
    Selection.Delete Shift:=xlShiftToLeft
    Columns("D:I").Select
    Selection.Delete Shift:=xlShiftToLeft
    Columns("F:F").Select
    With Columns("E:E")
        .EntireColumn.Hidden = False
        .ColumnWidth = 23.375
    End With
    Columns("F:G").Select
    Selection.Delete Shift:=xlShiftToLeft
    Range("E15").Select
    ActiveWindow.ScrollRow = 17
    Selection.FormulaR1C1 = "Âé·³¸øÕâ¸ö¿ÍÈË¸ö°ü×°´ü£¬ËıÒªËÍÈË¡£Ğ»Ğ»ßÕ"
    Range("E37").Select
    ActiveWindow.ScrollRow = 1
    With Columns("B:B")
        .EntireColumn.Hidden = False
        .ColumnWidth = 23.625
    End With
    Cells.Replace What:="*ÂéÀ±*Å£Èâ¿é", Replacement:="Å£Èâ¿é ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*ÌğÀ±*Å£Èâ¿é", Replacement:="Å£Èâ¿é ÌğÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*×ÎÈ»*Å£Èâ¿é", Replacement:="Å£Èâ¿é ×ÎÈ»", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*ÎåÏã*Å£Èâ¿é", Replacement:="Å£Èâ¿é ÎåÏã", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*ÌğÀ±*Å£ÈâË¿", Replacement:="Å£ÈâË¿ ÌğÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦´à¹Ç*ÂéÀ±*", Replacement:="¼¦´à¹Ç ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦´à¹Ç*ÌğÀ±*", Replacement:="¼¦´à¹Ç ÌğÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦´à¹Ç*×ÎÈ»*", Replacement:="¼¦´à¹Ç ×ÎÈ»", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦ëÓ*ÂéÀ±*", Replacement:="¼¦ëÓ ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦ëÓ*×ÎÈ»*", Replacement:="¼¦ëÓ ×ÎÈ»", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦ĞÄ*ÂéÀ±*", Replacement:="¼¦ĞÄ ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*¼¦ĞÄ*×ÎÈ»*", Replacement:="¼¦ĞÄ ×ÎÈ»", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*·ï×¦*ÂéÀ±*", Replacement:="¼¦×¦ ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*·ï×¦*Î¢À±*", Replacement:="¼¦×¦ Î¢À±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*Öí¶ú¶ä*", Replacement:="Öí¶ú¶ä ÏãÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*ÁµÁµ²»*ÌğÀ±", Replacement:="Ñ¼Éà ÌğÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*ÁµÁµ²»*ÏãÀ±", Replacement:="Ñ¼Éà ÂéÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*½´*", Replacement:="Èâ½´ ÏãÀ±", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True

End Sub
