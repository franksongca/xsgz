Attribute VB_Name = "NewMacros"
Sub ��������()
Attribute ��������.VB_Description = "���� Amos ¼�ƣ�ʱ��: 2015/10/23"
Attribute ��������.VB_ProcData.VB_Invoke_Func = " 14"
'
' �������� Macro
' ���� Amos ¼�ƣ�ʱ��: 2015/10/23
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
    Selection.FormulaR1C1 = "�鷳��������˸���װ������Ҫ���ˡ�лл��"
    Range("E37").Select
    ActiveWindow.ScrollRow = 1
    With Columns("B:B")
        .EntireColumn.Hidden = False
        .ColumnWidth = 23.625
    End With
    Cells.Replace What:="*����*ţ���", Replacement:="ţ��� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*ţ���", Replacement:="ţ��� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*��Ȼ*ţ���", Replacement:="ţ��� ��Ȼ", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*ţ���", Replacement:="ţ��� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*ţ��˿", Replacement:="ţ��˿ ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*�����*����*", Replacement:="����� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*�����*����*", Replacement:="����� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*�����*��Ȼ*", Replacement:="����� ��Ȼ", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*����*", Replacement:="���� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*��Ȼ*", Replacement:="���� ��Ȼ", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*����*", Replacement:="���� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*����*��Ȼ*", Replacement:="���� ��Ȼ", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*��צ*����*", Replacement:="��צ ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*��צ*΢��*", Replacement:="��צ ΢��", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*�����*", Replacement:="����� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*������*����", Replacement:="Ѽ�� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*������*����", Replacement:="Ѽ�� ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True
    Cells.Replace What:="*��*", Replacement:="�⽴ ����", LookAt:=xlPart, SearchOrder:=xlByRows, MatchCase:=False, MatchByte:=False, SearchFormat:=True, ReplaceFormat:=True

End Sub
