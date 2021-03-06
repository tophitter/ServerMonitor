﻿using System;

namespace ServerMonitor.Entities
{
    public class FolderSize
    {
        public string Path { get; set; }
        public double Size { get; set; }
        public double TotalSize { get; set; }

        public double Usage => Math.Round((Size / TotalSize) * 100, 2);
    }
}